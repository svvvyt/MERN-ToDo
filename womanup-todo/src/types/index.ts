export interface IListItem {
  _id: number,
  title: string,
  description: string,
  completionDate: string,
  isCompleted: boolean,
  imageUrl?: string
}