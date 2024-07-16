import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

export default function NavButtons({button1, button2, button3}) {
    const size = useWindowSize()
    const button2URL = "/" + button2.toString().toLowerCase()
    const button3URL = "/" + button3.toString().toLowerCase()
    const navigate = useNavigate()
    function handlePage(path) {
        navigate(path)
    }
    return(
        <>
            <Button 
                variant="outline-primary" 
                onClick={() => handlePage(button3URL)} 
                className="me-2 float-end"
                size={size.width < 768? "sm" : undefined}
            >
                {button3}
            </Button>
            <Button 
                variant="outline-primary" 
                onClick={() => handlePage(button2URL)} 
                className="me-2 float-end"
                size={size.width < 768? "sm" : undefined}
            >
                {button2}
            </Button>
            <Button 
                variant="outline-primary" 
                onClick={() => handlePage("/")} 
                className="me-2 float-end"
                size={size.width < 768? "sm" : undefined}
            >
                {button1}
            </Button>
        </>
    )
}