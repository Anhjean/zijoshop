import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import PouchDB from "pouchdb";
import PouchDBUpsert from "pouchdb-upsert";
// import { Credentials } from '../authentication/authentication.model';
PouchDB.plugin(PouchDBUpsert);

@Injectable({
  providedIn: "root",
})
export class PouchdbService {
  public localDB: PouchDB.Database;
  public shopDB: PouchDB.Database;
  // public remoteDB: PouchDB.Database|undefined;
  private url = "";
  private opts = { live: true, retry: true, continuous: true };

  constructor() {
    this.localDB = new PouchDB("localdb", { auto_compaction: true });
    this.shopDB = new PouchDB("shopdb", { auto_compaction: true });
  }

  async sha256(str: string) {
    const encoder = new TextEncoder();
    const encdata = encoder.encode(str);
    const buf = await crypto.subtle.digest("SHA-256", encdata);
    return Array.prototype.map
      .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
      .join("");
  }

  async init(username: string) {
    // sync shop data
    this.shopDB.replicate
      .from(environment.shop.shopdbUrl, { live: true, retry: true })
      .on("complete", (res) => {
        console.log(res);
      });
    // sync customer data
    const hashCusname = await (await this.sha256(username)).slice(0, 8);
    this.url = environment.shop.customerdbUrl + username + "-" + hashCusname;
    // const remoteDB = new PouchDB(this.url)
    if (username) {
      // do one way, one-off sync from the server until completion
      await this.localDB.replicate
        .from(this.url)
        .on("complete", (info: any) => {
          // then two-way, continuous, retriable sync
          console.log(info);
          this.localDB
            .sync(this.url, this.opts)
            .on("change", (info: any) => {
              // handle change
              console.log("Info", info);
            })
            .on("paused", (err: any) => {
              // replication paused (e.g. replication up to date, user went offline)
              console.log("Pause", err);
            })
            .on("active", () => {
              // replicate resumed (e.g. new changes replicating, user went back online)
              console.log("Active");
            })
            .on("denied", (err: any) => {
              // a document failed to replicate (e.g. due to permissions)
              console.log("Denied", err);
            })
            .on("complete", (info: any) => {
              // handle complete
              console.log("Complete", info);
            })
            .on("error", (err: any) => {
              // handle error
              console.log("Error", err);
            });
        })
        .on("error", (err: any) => {
          // handle error
          console.log("Get function Error", err);
        });
    }
  }

  upsertItem(
    type: string = "type",
    data: object,
    isLocal: boolean = false
  ): Promise<any> {
    const doc = {
      _id: isLocal ? "_local/" + type : type,
      time: Date.now(),
      ...data,
    };
    this.localDB.putIfNotExists(doc).then((res: any) => console.log(res));
    return this.localDB.get(doc._id);
  }

  // storeCredential(credentials: Credentials) {
  //   const doc = {
  //     _id: '_local/Credentials',
  //     time: Date.now(),
  //     ...credentials,
  //   };
  //   this.localDB.putIfNotExists(doc).then((res: any) => console.log(res));
  // }

  deleteItem(type: string = "type", isLocal: boolean = false): Promise<any> {
    const id = isLocal ? "_local/" + type : type;
    return this.localDB.get(id).then((res: any) => {
      return this.localDB.remove(res._id, res._rev);
    });
  }

  getItem(type: string = "type", isLocal: boolean = false) {
    const id = isLocal ? "_local/" + type : type;
    return this.localDB.get(id);
      // .then((res) => {
      //   console.log("Get Item result:", res);
      //   return res;
      // })
      // .catch((err: any) => console.log("Get Item error: ", err));
  }

  getShopItem(type: string = "type", isLocal: boolean = false): any {
    const id = isLocal ? "_local/" + type : type;
    return this.shopDB.get(id);
  }

  deleteShopItem(type: string = "type", isLocal: boolean = false): Promise<any> {
    const id = isLocal ? "_local/" + type : type;
    return this.shopDB.get(id).then((res: any) => {
      return this.shopDB.remove(res._id, res._rev);
    });
  }

  upsertShopItem(
    type: string = "type",
    data: object,
    isLocal: boolean = false
  ): Promise<any> {
    const doc = {
      _id: isLocal ? "_local/" + type : type,
      time: Date.now(),
      ...data,
    };
    this.shopDB.putIfNotExists(doc).then((res: any) => console.log(res));
    return this.shopDB.get(doc._id);
  }
}
