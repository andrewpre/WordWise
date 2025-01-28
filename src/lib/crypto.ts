import { randomBytes } from "crypto";

export function generate_key(){
    return randomBytes(16).toString('base64')
}