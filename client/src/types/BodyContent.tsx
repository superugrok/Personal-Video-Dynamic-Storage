export interface IItem {
  _id?: string;
  name: string;
  url: string;
  owner: string;
  type: "Youtube" | "Link";
}
