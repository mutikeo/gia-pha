export const demoConfig = [
  { id: "top-management", tags: ["top-management"] },
  { id: "hr-team", pid: "top-management", tags: ["hr-team", "department"], name: "HR department" },
  { id: "it-team", pid: "top-management", tags: ["it-team", "department"], name: "IT department" },
  { id: "sales-team", pid: "top-management", tags: ["sales-team", "department"], name: "Sales department" },

  { id: 1, stpid: "top-management", name: "Nicky Phillips", title: "CEO", img: "https://cdn.balkan.app/shared/anim/1.gif", tags: ["seo-menu"] },
  { id: 2, pid: 1, name: "Rowan Hall", title: "Shareholder (51%)", img: "https://cdn.balkan.app/shared/2.jpg", tags: ["menu-without-add"] },
  { id: 3, pid: 1, name: "Danni Anderson", title: "Shareholder (49%)", img: "https://cdn.balkan.app/shared/3.jpg", tags: ["menu-without-add"] },

  { id: 4, stpid: "hr-team", name: "Jordan Harris", title: "HR Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
  { id: 5, pid: 4, name: "Emerson Adams", title: "Senior HR", img: "https://cdn.balkan.app/shared/5.jpg" },
  { id: 6, pid: 4, name: "Kai Morgan", title: "Junior HR", img: "https://cdn.balkan.app/shared/6.jpg" },

  { id: 7, stpid: "it-team", name: "Cory Robbins", title: "Core Team Lead", img: "https://cdn.balkan.app/shared/7.jpg" },
  { id: 8, pid: 7, name: "Billie Roach", title: "Backend Senior Developer", img: "https://cdn.balkan.app/shared/8.jpg" },
  { id: 9, pid: 7, name: "Maddox Hood", title: "C# Developer", img: "https://cdn.balkan.app/shared/9.jpg" },
  { id: 10, pid: 7, name: "Sam Tyson", title: "Backend Junior Developer", img: "https://cdn.balkan.app/shared/10.jpg" },

  { id: 11, stpid: "it-team", name: "Lynn Fleming", title: "UI Team Lead", img: "https://cdn.balkan.app/shared/11.jpg" },
  { id: 12, pid: 11, name: "Jo Baker", title: "JS Developer", img: "https://cdn.balkan.app/shared/12.jpg" },
  { id: 13, pid: 11, name: "Emerson Lewis", title: "Graphic Designer", img: "https://cdn.balkan.app/shared/13.jpg" },
  { id: 14, pid: 11, name: "Haiden Atkinson", title: "UX Expert", img: "https://cdn.balkan.app/shared/14.jpg" },
  { id: 15, stpid: "sales-team", name: "Tyler Chavez", title: "Sales Manager", img: "https://cdn.balkan.app/shared/15.jpg" },
  { id: 16, pid: 15, name: "Raylee Allen", title: "Sales", img: "https://cdn.balkan.app/shared/16.jpg" },
  { id: 17, pid: 15, name: "Kris Horne", title: "Sales Guru", img: "https://cdn.balkan.app/shared/8.jpg" },
  { id: 18, pid: "top-management", name: "Leslie Mcclain", title: "Personal assistant", img: "https://cdn.balkan.app/shared/9.jpg", tags: ["assistant", "menu-without-add"] }
];