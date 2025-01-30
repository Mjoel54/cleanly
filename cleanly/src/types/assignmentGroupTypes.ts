export type TabItem = {
  id: string;
  html_url: string;
  full_url: string;
  position: number;
  visibility: "public" | "members" | "admins" | "none"; // Adjust based on API docs
  label: string;
  type: string;
  url?: string; // Optional property (only for external tools)
  unused?: boolean;
  hidden?: boolean;
};
