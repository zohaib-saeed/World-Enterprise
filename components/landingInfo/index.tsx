import { SvgIconComponent } from "@mui/icons-material"
import { Box, Avatar, Container, Typography, SxProps, Theme} from "@mui/material"

const LandingInfo = ({ Icon, title, content, sx, color }: { Icon: SvgIconComponent, title: string, content: string, sx: SxProps<Theme> | undefined, color: string }) => {
  return (
    <Box
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar>
        <Icon fontSize="medium" htmlColor={ color } />
      </Avatar>
      <Container
        sx={{
          flex: 1,
          minWidth: "54px",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          verticalAlign: "middle",
        }}
      >
        <Typography variant="h3">{ title }</Typography>
        <Typography variant="body1" sx={{ marginTop: "5px" }}>{ content }</Typography>
      </Container>
    </Box>
  )
}

export default LandingInfo