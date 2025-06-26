export interface SystemTabs {
  icon: string,
  label: string,
  key: string,
  closable: boolean,
}

export const initialState: SystemTabs[] = [
  {
    icon: "QuestionCircleOutlined",
    label: "主页",
    key: "/index",
    closable: false
  }
]