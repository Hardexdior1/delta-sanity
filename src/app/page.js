
"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
export default function Home() {
  
     const router=useRouter()


useEffect(()=>{
router.push('/auth')
},[])
  return (
    <main>


  baseURL: "https://report-backend-xe01.onrender.com/api/",




email
: 
"10alexmichel10@gmail.com"
fullName
: 
"Admin"
role
: 
"admin"
token
: 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTQ3OTVkYjIzZGI1OGI0MTE0MzU5MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc1MDY2MzMxOCwiZXhwIjoxNzUxMjY4MTE4fQ.N1W87eCVRuoQK6UvbdPSAI619vV5uFN8OsV9EKpn0d0"
_id
: 
"6854795db23db58b41143592"




      






    </main>
  );
}


