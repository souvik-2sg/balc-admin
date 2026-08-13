import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ElectionList from "@/components/elections/ElectionList";

export default function ListElectionPage() {
  return <div><PageBreadcrumb pageTitle="List Election" /><ElectionList /></div>;
}
