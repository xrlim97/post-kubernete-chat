import { useState, useEffect, useRef } from 'react'
import { WS_DOMAIN } from './constants';

export function useWebSocket() {
    const [msg, setMsg] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(`ws://${WS_DOMAIN}/websocket`);
        ws.current.onopen = () => {
            console.log("ws open");
            setIsConnected(true);
        };

        ws.current.onclose = () => {
            console.log("ws closed");
            setIsConnected(false);
        }

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = e => {
            if (typeof e.data === 'string' ||e.data instanceof String) {
                msg.unshift(e.data);
                var newMsg = [...msg];
                setMsg(newMsg);
            }
        };
    }, [isConnected]);

    const sendMessage = msg => {
        console.log(isConnected, msg)
        if (isConnected === true) {
            ws.current.send(msg);
        }
    }

    return [msg, isConnected, sendMessage]
}