import { Button } from "@mui/material"
import { sendMessageStrem } from "plugins/service/apis"
import { useEffect } from "react"

const TestPage = () => {

    useEffect(() => {
        
    }, [])
    return (
        <>
            <Button onClick={() => {
                sendMessageStrem('11111', '你好吗')
            }}>Send</Button>
        </>
    )
}

export default TestPage