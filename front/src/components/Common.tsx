import React from 'react'
import styled from 'styled-components'
import logoImage from '../images/logo.gif'
import { useParams } from 'react-router-dom'

// Headerのスタイル
const HeaderH1 = styled.h1`
  position: relative;
  padding: 5px 5px 5px 42px;
  background: #305097;
  color: white;
  margin-left: -33px;
  line-height: 1.3;
  z-index:-1;
  text-align: center;
`
// Header/Footer領域のstyle
const HeaderDiv = styled.div`
  text-align: center;
`
export const Header = (props: {headerStr: String}) => {
  return (
    <HeaderDiv>
      <img src={logoImage} alt="logo" /><br/>
      <HeaderH1>{props.headerStr}</HeaderH1>
    </HeaderDiv>
  )
}

// 各ページのフッタ
export const Footer = () => {
  return (
    <HeaderDiv>
      <img src={logoImage} alt="logo" /><br/>
      関門記録システム提供<br/>
      リコーITソリューションズ株式会社 北見事業所
    </HeaderDiv>
  )
}


export const UserEdit = ()  => {
  const {event_id} = useParams<{event_id: string}>();
  return (
    <div>
      <div>id = {event_id}</div>
    </div>
  )
}

