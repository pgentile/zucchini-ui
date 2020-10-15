import queryString from "query-string";

import Breadcrumb from "../../ui/components/Breadcrumb";
import useQueryParams from "../../useQueryParams";

export default function TestRunsBreadcrumb() {
  const { type } = useQueryParams();

  const items = [
    {
      value: "Derniers tirs",
      link: "/"
    }
  ];

  if (type) {
    items.push({
      value: `Type ${type}`,
      link: {
        pathname: "/",
        search: queryString.stringify({ type })
      }
    });
  }

  return <Breadcrumb items={items} />;
}
