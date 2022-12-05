import { QrCode, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { Dialog, Select as MuiSelect, alpha, styled, IconButton, Button, Avatar } from "@mui/material";
import { Input } from "../input";

const DetailDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    background: "#ffffff",
    boxShadow: "none",
    position: "absolute",
    bottom: 0,
    margin: 0,
    padding: "0px 16px 0px 16px",
    textAlign: "center",
    width: "calc(100% - 32px)",
    borderRadius: "16px 16px 0px 0px",
    color: "#241F21",
    // width: "100%",
  },

  "& .MuiDialogTitle-root": {
    padding: "16px 0px",
    backgroundColor: "#FFFFFF",
    borderRadius: "16px 16px 0px 0px",
  },

  "& .MuiDialogTitle-root span": {
    fontFamily: 'Montserrat',
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px",
    textAlign: "center",
    color: "#000000",
  },

  "& .MuiDialogContent-root": {
    backgroundColor: "#FFFFFF",
    padding: "4px 0px",
  },

  "& .MuiDialogContent-root > div": {
    display: "flex",
    justifyContent: "flex-start",
    border: "1px solid #E3E8EB",
    borderRadius: "8px",
    padding: "15px 12px",
    margin: "12px 0px",

    fontFamily: 'Montserrat',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#000000",
  },

  "& .MuiDialogContent-root > div > span": {
    display: "block",
    width: "100%",
  },

  "& .MuiDialogContent-root > div > input": {
    display: "block",
    width: "100%",
    textAlign: "right",
    border: "1px solid #FFFFFFFF",
    ":focusVisible": {
      border: "1px solid #FFFFFFFF",
    },
    fontFamily: 'Montserrat',
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "15px",
    color: "#000000",
    outline: "none",
  },

  "& .MuiDialogActions-root": {
    backgroundColor: "#FFFFFF",
    padding: "16px 0px 28px 0px",
  },

  "& .MuiDialogActions-root button": {
    fontFamily: 'Montserrat',
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
  },

  // "& .MuiDialogActions-root > :not(:first-of-type)": {
  //   marginLeft: "0px",
  // }
}));

export default DetailDialog

export const InfoInput = ({label, type, value, onChange}: {label: string, type: "number" | "string", value: string, onChange: React.ChangeEventHandler<HTMLInputElement>}) => {
  return (
    <div>
      <span style={{ textAlign: "left" }}>{label}</span>
      <input id="amount" type={type} value={value} onChange={onChange} />
    </div>
  )
}

export const Info = ({label, value}: {label: string, value: string}) => {
  return (
    <div>
      <span style={{ textAlign: "left" }}>{label}</span>
      <span style={{ textAlign: "right" }}>{value}</span>
    </div>
  )
}

export const InfoAddr = ({label, value}: {label: string, value: string}) => {
  return (
    <div>
      <span style={{ textAlign: "left" }}>{label}</span>
      <span style={{ textAlign: "right", maxWidth: "16ch", overflow: "hidden", textOverflow: "ellipsis", }}>{value}</span>
      <IconButton sx={{ float: "right", width: "19px", height: "19px" }}>
        <QrCode htmlColor="#3D61B0" sx={{ width: "19px", height: "19px" }} />
      </IconButton>
    </div>
  )
}

export const InfoVote = ({ type, num }: { type: "yes" | "no", num: number }) => {
  return (
    <div style={{
      display: "flex",
      flexFlow: "row",
      padding: "10px 20px",
      marginRight: type=="yes" ? "7px": "0px",
      border: "1px solid #E3E8EB",
      borderRadius: "8px",
      width: "100%",
    }}>
      <Avatar style={{
        width: "42px",
        height: "42px",
        borderWidth: "0px",
        marginRight: "10px",
        backgroundColor: type == "yes" ? "#42B03D1E" : "#FF2A001E",
      }}>
        {type == "yes" ? (
          <ThumbUpAltOutlined htmlColor="#42B03D"/>
        ): (
          <ThumbDownAltOutlined htmlColor="#FF2A00"/>
        )}
      </Avatar>
      <div style={{        
        display: "flex",
        flexFlow: "column",
        width: "100%",
        fontFamily: 'Montserrat',
        textAlign: "left",
      }}>
        <span style={{
          fontWeight: "400",
          fontSize: "12px",
          lineHeight: "15px",
          paddingTop: "2px"
        }}>{type == "yes" ? "Yes" : "No"} Vote</span>
        <span style={{
          fontWeight: "600",
          fontSize: "16px",
          lineHeight: "20px",
          paddingTop: "3px"
        }}>{num}</span>
      </div>
    </div>
  )
}

export const BtnCancel = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  height: "53px",
  backgroundColor: "#E3E8EB",
  textAlign: "center",
  fontFamily: 'Montserrat',
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "17px",
  lineHeight: "22px",
  color: "#4B4749",
  width: "100%",
  ":hover": {
    backgroundColor: "#f3f6f8",
  }
}))

export const BtnOK = styled(Button)(({ theme }) => ({
  borderRadius: "10px",
  height: "53px",
  backgroundColor: "#42B03D",
  textAlign: "center",
  fontFamily: 'Montserrat',
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "17px",
  lineHeight: "22px",
  color: "#ffffff",
  width: "100%",
  ":hover": {
    backgroundColor: "#4bcb46",
  }
}))

export const BtnOption = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  height: "48px",
  margin: "5px 0px",
  padding: "15px",
  backgroundColor: "#FFFFFF",
  textAlign: "left",
  fontFamily: 'Montserrat',
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "22px",
  color: "#367BCF",
  width: "100%",
  boxShadow: "none",
  border: "1px solid #E3E8EB",
  display: "flex",
  justifyContent: "flex-start",
  ":hover": {
    backgroundColor: "#EEEEEE",
    boxShadow: "none",
  },
  "& span": {
    width: "100%"
  }
}))