import Link from "next/link";
import { fetchGitHubStats } from "@/lib/github";

export default async function LatestVersion() {
  const stats = await fetchGitHubStats("taskgenius", "taskgenius-plugin");
  const version = stats.latestVersion || "1.0.0";

  return (
    <>
      <Link
        href={`https://github.com/taskgenius/taskgenius-plugin/releases/tag/${
          stats.latestVersion || "latest"
        }`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={"text-sm text-fd-muted-foreground"}>
          Latest version:{" "}
        </span>
        <span className={"text-sm font-medium"}>{version}</span>
      </Link>
    </>
  );
}
