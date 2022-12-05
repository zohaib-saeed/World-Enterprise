export type Enterprise = {
    info: EnterpriseInfo,
    shareholders: Shareholder[],
    admins: Admin[],
    treasury: Assets[]
    shares: ShareInfo,
    proposals: Proposal[],
    transactions: Transaction[]
  }
  
  export type EnterpriseInfo = {
    name: string,
    logo: string,
    tokenName: string,
    description: string,
    isRegisterd: boolean, // is this an existing company registered with a government
    type: string,
    address1: string | undefined,
    address2: string | undefined,
    country: string | undefined,
    state: string | undefined,
    city: string | undefined,
    zip: string | undefined,
    wepID: string | undefined,
  }
  
  export type Shareholder = {
    walletAddr: string,
    shares: number,
    name: string | undefined,
  }
  
  export type Admin = {
    walletAddr: string,
    isActive: boolean,
    name: string | undefined,
    email: string | undefined,
    phone: string | undefined,
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
    proposalType: string,
    votesYes: number,
    votesNo: number,
    walletAddr: string,
    name: string

  }

  export type Transaction = {
    id: number,
    transactionType: string,
    category: string,
    amount: number | null,
    date: string

  }
  
 export type Order = {
    id: number,
    orderType: string,
    amount: number,
    price: number,
    date: string,
    maker: string,
    taker: string

  }
  
  
