import React, { useEffect } from 'react'
import { Header, Footer, UserEdit } from '../components/Common'
import { useParams } from 'react-router-dom'
//import styled from 'styled-components'

type Event = {
  id: string,
  event_name: string,
  date: string,
  summary: string
};

type Information = {
  gate: string,
  rank: number,
  class: string,
  name: string,
  time: string
};

function  getEvent(event_id: string) {
  const host: string = "http://localhost:8000/";
  const url = `${host}gateChecker/api/events/${event_id}/latestInformation`

  console.log(`GET ${url}`)
  //
  const info = fetch(url,  { mode: "no-cors" }).then(res => res.json())
  //const message = JSON.parse(info);
  console.log(info)
  return "OK"
}

export class LatestInformation extends React.Component {
  constructor(props: any) {
    super(props)
  }


  render() {
    // URLパラメータでコネクションIDとプロトコルとtypeを得る
    const params = new URLSearchParams(window.location.search);

    // connId. roomIdは指定必須
    // params.get()の戻り値はstring | nullなので、別途roomId: stringのように定義しておくと、下の方で!や?を指定しなくてよくなる。
    const eventId = params.get("event_id");
    if (eventId === null) {
      throw new Error("eventId not found");
    }

    const x = getEvent(eventId);
    console.log("event is " + x)


    return (
      <div>
        <Header headerStr="第1回強行遠足"/>
        {eventId}
        <Footer/>
      </div>
    )
  }
}
