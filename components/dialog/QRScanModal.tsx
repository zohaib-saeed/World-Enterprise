import { Dialog, DialogContent } from '@mui/material'
import { Box } from '@mui/system'
import QrScanner from 'qr-scanner'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const QRScanModal = ({ open, onClose, qrHandler }: { open: boolean, onClose: Function, qrHandler: Function }) => {

  const [videoEle, setVideoEle] = useState<HTMLVideoElement | null>()
  
  let scanner: QrScanner | null
  
  const refHandler = (el: HTMLVideoElement | null) => {
    if (open) {
      console.log(el)
      setVideoEle(el)
      if (el) {
        scanner = new QrScanner(
          el,
          result => {
            console.log(result)
            qrHandler(result.data)
            closeHandler(el)()
            // el.srcObject = null
          }, {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        )
        scanner.start().then(() => {
          if (scanner === null) {
            // const tracks = el.srcObject ? el.srcObject.getTracks() : []
  
          }
        })
        console.log("started")
      }
    }
  }

  useEffect(() => {
    
  }, [])

  const closeHandler = (videoEle: HTMLVideoElement | null | undefined) => () => {
    console.log("close")
    const stream: MediaStream | null | undefined = videoEle?.srcObject as MediaStream
    console.log(stream.getTracks())
    const tracks = stream ? stream.getTracks() : []
    tracks.forEach((track) => {
      console.log("Stop")
      track.stop()
    })
    onClose()
    scanner?.stop()
    scanner?.destroy()
    scanner = null
    setVideoEle(null)
  }


  return (
    <Dialog open={open} onClose={closeHandler(videoEle)} >
      <DialogContent>
        {open && (
          <Box component="video" sx={{ width: "100%" }} ref={refHandler} />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default QRScanModal