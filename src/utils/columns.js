export const columns = [
  {
    name: "id",
    label: "ID",
    options: {
      filter: false,
      sort: false,
      display: false,
    },
  },
  {
    name: "name",
    label: "Name",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "email",
    label: "E-mail",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "birth_date",
    label: "Birth Date",
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: "is_infected",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    },
  },
];
