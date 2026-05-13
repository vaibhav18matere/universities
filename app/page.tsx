import { CollegeDirectory } from "@/app/components/CollegeDirectory";
import { getAllColleges } from "@/lib/colleges-catalog";

export default function HomePage() {
  const colleges = getAllColleges();
  return <CollegeDirectory colleges={colleges} />;
}
