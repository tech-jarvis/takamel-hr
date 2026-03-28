import { redirect } from "next/navigation";

export default function LegacyEmployeesRedirect() {
  redirect("/hrms/people");
}
