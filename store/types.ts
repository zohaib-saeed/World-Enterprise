export type Enterprise = {
  info: EnterpriseInfo,
  shareholders: Shareholder[],
  admins: Admin[],
  proposals: Proposal[],
  transactions: Transaction[],
  orders: Order[],
  mine: boolean,
}

export type EnterpriseInfo = {
  name: string,
  logo: string,
  tokenName: string,
  description: string,
  isRegisterd: boolean, // is this an existing company registered with a government
  type: string,
  address1?: string,
  address2?: string,
  country?: string,
  state?: string,
  city?: string,
  zip?: string,
  wepID?: string,
}

export type Shareholder = {
  walletAddr: string,
  numOfShare: number,
  firstName?: string,
  lastName?: string,
}

export type Admin = {
  walletAddr: string,
  isActive: boolean,
  fullName?: string,
  email?: string,
  phone?: string,
}

export type Assets = {
  name: string,
  walletAddr: string,
  amount: number
}

export type ShareInfo = {
  totalShares: number,
  sharePrice: number,
  totalMembers: number
}

export type Proposal = {
  id: number,
  type: "admin" | "shareholder",
  votesYes: number,
  votesNo: number,
  walletAddr: string,
  name: string,
  isApproved: boolean,
}

export type Transaction = {
  id: number,
  type: string,
  category: string,
  amount: number,
  date: Date,
  isSend: boolean,
}

export type Order = {
  id: number,
  orderType: "buy" | "sell",
  amount: number,
  price: number,
  date: Date,
  // wallet address
  maker: string,
  taker?: string
}

export enum STEP {
  INDEX = "INDEX",
  
  CREATE_ENTERPRISE_INPUT = "CREATE_ENTERPRISE_INPUT",
  CREATE_SHAREHOLDERS_VIEW = "CREATE_SHAREHOLDERS_VIEW",
  CREATE_SHAREHOLDER_ADD = "CREATE_SHAREHOLDER_ADD",
  CREATE_SHAREHOLDER_EDIT = "CREATE_SHAREHOLDER_EDIT",
  CREATE_ADMINS_VIEW = "CREATE_ADMINS_VIEW",
  CREATE_ADMIN_ADD = "CREATE_ADMIN_ADD",
  CREATE_ADMIN_EDIT = "CREATE_ADMIN_EDIT",
  CREATE_PROCESSING = "CREATE_PROCESSING",
  CREATE_SUCCESSED = "CREATE_SUCCESSED",
  
  SHAREHOLDER_ADD = "SHAREHOLDER_ADD",
  
  ADMIN_ADD = "ADMIN_ADD",
  ADMIN_EDIT = "ADMIN_EDIT",
  
  SETTING_COMPANY_REVIEW = "SETTING_COMPANY_REVIEW",
  
  PROPOSAL_ADMIN = "PROPOSAL_ADMIN",
  PROPOSAL_SHAREHOLDER = "PROPOSAL_SHAREHOLDER",

  DASHBOARD_ADMIN_EDIT = "DASHBOARD_ADMIN_EDIT",
  DASHBOARD_MEMBERS = "DASHBOARD_MEMBERS",
  DASHBOARD_MEMBERS_ADMIN_EDIT = "DASHBOARD_MEMBERS_ADMIN_EDIT",
  DASHBOARD_MEMBERS_SHAREHOLDER_EDIT = "DASHBOARD_MEMBERS_SHAREHOLDER_EDIT",

  DASHBOARD_TRADE_ADD = "DASHBOARD_TRADE_ADD",
  DASHBOARD_TRADE_ORDERBOOK = "DASHBOARD_TRADE_ORDERBOOK",
}
