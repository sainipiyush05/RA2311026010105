export interface INotification {
  ID: string;
  Type: "Placement" | "Result" | "Event" | string;
  Message: string;
  Timestamp: string;
}
