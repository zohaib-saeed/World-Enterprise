import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Enterprise } from "./types";

export interface EnterprisesState {
  joined: boolean;
  authState: boolean;
  enterprises: Enterprise[];
  tempEnterprise: Enterprise;
  toEditShareholder: number;
  toEditAdmin: number;
}

const initialState: EnterprisesState = {
  joined: false,
  authState: false,
  enterprises: [
    {
      info: {
        name: "ABC Corporation",
        logo: "/images/ABC_Logo1.png",
        tokenName: "ABC",
        description: "",
        isRegisterd: true,
        type: "LLC",
        wepID: "1452",
      },
      shareholders: [
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          numOfShare: 2500,
          firstName: "John",
          lastName: "Appleseed",
        },
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          numOfShare: 1000,
          firstName: "Brian",
          lastName: "Adams",
        },
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          numOfShare: 500,
          firstName: "Damein",
          lastName: "Fork",
        },
      ],
      admins: [
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isActive: true,
          fullName: "Leah Smith",
          email: "smith@example.com",
          phone: "+4 235 122 2235",
        },
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isActive: true,
          fullName: "Leo Greene",
          email: "leogreene@example.com",
          phone: "+5 675 122 2235",
        },
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isActive: false,
          fullName: "Erik Doe",
          email: "erikdoe@example.com",
          phone: "+2 675 122 2235",
        },
        {
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isActive: false,
          fullName: "Frank Delaron",
          email: "frankdelaron@example.com",
          phone: "+8 675 122 2235",
        },
      ],
      proposals: [
        {
          id: 0,
          name: "John Appleseed",
          type: "admin",
          votesYes: 5,
          votesNo: 1,
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isApproved: false,
        },
        {
          id: 1,
          name: "William Garcia",
          type: "shareholder",
          votesYes: 1,
          votesNo: 3,
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isApproved: false,
        },
        {
          id: 2,
          name: "William Garcia",
          type: "shareholder",
          votesYes: 1,
          votesNo: 3,
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isApproved: false,
        },
        {
          id: 3,
          name: "William Garcia",
          type: "shareholder",
          votesYes: 3,
          votesNo: 1,
          walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
          isApproved: true,
        },
      ],
      transactions: [
        {
          id: 0,
          type: "USDC",
          category: "Money Transfer",
          amount: 1000,
          date: new Date(2021, 1, 1, 0, 0, 0, 0),
          isSend: true,
        },
        {
          id: 1,
          type: "USDC",
          category: "Money Transfer",
          amount: 250,
          date: new Date(2021, 1, 2, 10, 20, 0, 0),
          isSend: false,
        },
        {
          id: 2,
          type: "USDC",
          category: "Money Transfer",
          amount: 1200,
          date: new Date(2021, 1, 3, 0, 0, 0, 0),
          isSend: true,
        },
        {
          id: 3,
          type: "USDC",
          category: "Money Transfer",
          amount: 400,
          date: new Date(2021, 1, 4, 0, 20, 0, 0),
          isSend: false,
        },
        {
          id: 4,
          type: "USDC",
          category: "Money Transfer",
          amount: 300,
          date: new Date(2021, 1, 5, 0, 0, 0, 0),
          isSend: true,
        },
      ],
      orders: [
        {
          id: 0,
          orderType: "sell",
          amount: 100,
          price: 15,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 1,
          orderType: "buy",
          amount: 100,
          price: 15,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 2,
          orderType: "buy",
          amount: 120,
          price: 18,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 3,
          orderType: "sell",
          amount: 200,
          price: 12,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 4,
          orderType: "buy",
          amount: 1000,
          price: 11,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 5,
          orderType: "buy",
          amount: 300,
          price: 20,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 6,
          orderType: "sell",
          amount: 500,
          price: 25,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 7,
          orderType: "sell",
          amount: 50,
          price: 45,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 8,
          orderType: "buy",
          amount: 98,
          price: 35,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 9,
          orderType: "sell",
          amount: 30,
          price: 30,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
        {
          id: 10,
          orderType: "buy",
          amount: 25,
          price: 36,
          date: new Date(2022, 1, 1),
          maker: "0x5d4C7743Cdbe1FbcE73d80F970855F3eac9582AC",
        },
      ],
      mine: false,
    },
  ],
  tempEnterprise: {
    info: {
      name: "",
      logo: "",
      tokenName: "",
      description: "",
      isRegisterd: false,
      type: "",
    },
    admins: [
      {
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isActive: true,
        fullName: "Leah Smith",
        email: "smith@example.com",
        phone: "+4 235 122 2235",
      },
      {
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isActive: true,
        fullName: "Leo Greene",
        email: "leogreene@example.com",
        phone: "+5 675 122 2235",
      },
      {
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isActive: false,
        fullName: "Erik Doe",
        email: "erikdoe@example.com",
        phone: "+2 675 122 2235",
      },
      {
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isActive: false,
        fullName: "Frank Delaron",
        email: "frankdelaron@example.com",
        phone: "+8 675 122 2235",
      },
    ],
    shareholders: [],
    proposals: [
      {
        id: 0,
        name: "John Appleseed",
        type: "admin",
        votesYes: 5,
        votesNo: 1,
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isApproved: false,
      },
      {
        id: 1,
        name: "William Garcia",
        type: "shareholder",
        votesYes: 1,
        votesNo: 3,
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isApproved: false,
      },
      {
        id: 2,
        name: "William Garcia",
        type: "shareholder",
        votesYes: 1,
        votesNo: 3,
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isApproved: false,
      },
      {
        id: 3,
        name: "William Garcia",
        type: "shareholder",
        votesYes: 3,
        votesNo: 1,
        walletAddr: "0x6448E4c52275D39865f0f23C3Ba06b7b762e2a25",
        isApproved: true,
      },
    ],
    transactions: [
      {
        id: 0,
        type: "USDC",
        category: "Money Transfer",
        amount: 1000,
        date: new Date(2021, 1, 1, 0, 0, 0, 0),
        isSend: true,
      },
      {
        id: 1,
        type: "USDC",
        category: "Money Transfer",
        amount: 250,
        date: new Date(2021, 1, 2, 10, 20, 0, 0),
        isSend: false,
      },
      {
        id: 2,
        type: "USDC",
        category: "Money Transfer",
        amount: 1200,
        date: new Date(2021, 1, 3, 0, 0, 0, 0),
        isSend: true,
      },
      {
        id: 3,
        type: "USDC",
        category: "Money Transfer",
        amount: 400,
        date: new Date(2021, 1, 4, 0, 20, 0, 0),
        isSend: false,
      },
      {
        id: 4,
        type: "USDC",
        category: "Money Transfer",
        amount: 300,
        date: new Date(2021, 1, 5, 0, 0, 0, 0),
        isSend: true,
      },
    ],
    orders: [],
    mine: false,
  },
  toEditShareholder: -1,
  toEditAdmin: -1,
};

export const enterprisesSlice = createSlice({
  name: "enterprises",
  initialState,
  reducers: {
    setJoinState(state, action) {
      state.joined = action.payload;
    },
    setAuthState(state, action) {
      console.log(action);
      state.authState = action.payload;
    },
    // Enterprise info state
    setEnterpriseInfoState(state, action) {
      state.tempEnterprise.info = action.payload;
    },
    setEmptyEnterpriseInfoState(state, action) {
      state.tempEnterprise.info = initialState.tempEnterprise.info;
    },

    // shareholders
    addShareholderState(state, action) {
      console.log(action);
      state.tempEnterprise.shareholders = [
        ...state.tempEnterprise.shareholders,
        action.payload,
      ];
    },
    setEmptyShareholdersState(state, action) {
      state.tempEnterprise.shareholders =
        initialState.tempEnterprise.shareholders;
    },
    removeShareholderState(state, action) {
      state.tempEnterprise.shareholders.splice(action.payload, 1);
    },
    setToEditShareholderState(state, action) {
      state.toEditShareholder = action.payload;
    },
    replaceShareholderState(state, action) {
      state.tempEnterprise.shareholders[state.toEditShareholder] =
        action.payload;
    },

    // admins
    resetAdminState(state, action) {
      state.tempEnterprise.admins = action.payload;
    },
    addAdminState(state, action) {
      state.tempEnterprise.admins = [
        ...state.tempEnterprise.admins,
        action.payload,
      ];
    },
    setEmptyAdminsState(state, action) {
      state.tempEnterprise.admins = initialState.tempEnterprise.admins;
    },
    removeAdminState(state, action) {
      state.tempEnterprise.admins.splice(action.payload, 1);
    },
    setToEditAdminState(state, action) {
      state.toEditAdmin = action.payload;
    },
    replaceAdminState(state, action) {
      state.tempEnterprise.admins[state.toEditAdmin] = action.payload;
    },

    // orders
    setOrderState(state, action) {
      state.tempEnterprise.orders = [
        ...state.tempEnterprise.orders,
        action.payload,
      ];
    },

    //
    setEnterprisesState(state, action) {
      state.enterprises = [...state.enterprises, action.payload];
    },

    setTempEnterpriseState(state, action) {
      console.log(action);
      state.tempEnterprise = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.enterprises,
      };
    },
  },
});

export const {
  setJoinState,
  setAuthState,
  setEnterpriseInfoState,
  setEmptyEnterpriseInfoState,
  setEnterprisesState,

  // shareholders
  addShareholderState,
  setEmptyShareholdersState,
  removeShareholderState,
  setToEditShareholderState,
  replaceShareholderState,

  // admins
  resetAdminState,
  addAdminState,
  setEmptyAdminsState,
  removeAdminState,
  setToEditAdminState,
  replaceAdminState,

  // orders
  setOrderState,

  setTempEnterpriseState,
} = enterprisesSlice.actions;

export const selectJoinState = (state: AppState) => state.enterprises.joined;
export const selectAuthState = (state: AppState) => state.enterprises.authState;
export const selectTempEnterpriseState = (state: AppState) =>
  state.enterprises.tempEnterprise;
export const selectTempEnterpriseInfoState = (state: AppState) =>
  state.enterprises.tempEnterprise.info;
export const selectEnterprisesState = (state: AppState) =>
  state.enterprises.enterprises;
// shareholders
export const selectShareholdersState = (state: AppState) =>
  state.enterprises.tempEnterprise.shareholders;
export const selectToEditShareholderState = (state: AppState) =>
  state.enterprises.toEditShareholder;
// admins
export const selectAdminsState = (state: AppState) =>
  state.enterprises.tempEnterprise.admins;
export const selectToEditAdminState = (state: AppState) =>
  state.enterprises.toEditAdmin;
// orders
export const selectOrderState = (state: AppState) =>
  state.enterprises.tempEnterprise.orders;

export default enterprisesSlice.reducer;
