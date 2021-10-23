import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-team-block",
  templateUrl: "./team-block.component.html",
  styleUrls: ["./team-block.component.scss"],
})
export class TeamBlockComponent implements OnInit {
  team = [
    { name: "Nguyễn Hoàng Anh", title: "Founder" , picUrl:"assets/images/avatars/staff.jpeg"},
    { name: "Nguyễn Hoàng An", title: "Co-Founder",picUrl:"assets/images/avatars/headshots.jpeg" },
    { name: "Nguyễn Hoàng A", title: "Co-Founder" ,picUrl:"assets/images/avatars/staff.jpeg"},
  ];
  constructor() {}

  ngOnInit(): void {}
}
