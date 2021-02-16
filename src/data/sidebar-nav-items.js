export default function() {
  return [
    {
      title: "Dashboard",
      to: "/",
      htmlBefore: '<i class="material-icons">edit</i>',
      htmlAfter: ""
    },
    {
      title: "Residents",
      htmlBefore: '<i class="material-icons">apartment</i>',
      to: "/tenants",
    },
    {
      title: "Packages",
      htmlBefore: '<i class="material-icons">local_shipping</i>',
      to: "/tenants",
    },
    {
      title: "Complaints/Events",
      htmlBefore: '<i class="material-icons">today</i>',
      to: "/tenants",
    },
    {
      title: "Reports",
      htmlBefore: '<i class="material-icons">summarize</i>',
      to: "/tenants",
    }
  ];
}
