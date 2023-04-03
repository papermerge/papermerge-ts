import styles from "./breadcrumb.module.scss";
import BreadcrumbItem from "./item";

type Args = {
  path: Array<[string, string]>;
  onClick: (node_id: string) => void;
}

export default function Breadcrumb({path, onClick}: Args) {
  let breadcrumb_items = path.map((item: [string, string]) => {
    return <BreadcrumbItem
      node_id={item[0]}
      node_title={item[1]}
      onClick={onClick}
    />
  });

  return (
    <ul className={styles.breadcrumb}>
      {breadcrumb_items}
    </ul>
  );
}
