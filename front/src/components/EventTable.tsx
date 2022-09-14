import React from 'react'
import styled from 'styled-components'

type EventData = {
  name: String,
  date: String
}

const EventTableDiv = styled.div`
  align-items: center;
`

const StyledTable = styled.table`
  margin: auto;
  border-style: solid;
  border-width: 1px;
  border-color: gray;
`
const StyledTd = styled.td`
  border-style: solid;
  border-width: 1px;
  border-color: gray;
`

const StyledTh = styled.th`
  border-style: solid;
  border-width: 1px;
  border-color: gray;
`

const eventData: EventData[] = [
  {"name": "第一回大会", "date": "2020-10-1"},
  {"name": "第二回大会", "date": "2021-10-2"},
  {"name": "第三回大会", "date": "2022-10-3"}
]

export class EventTable extends React.Component {
  renderTable() {
      const rows = eventData.map(({name, date}, index, array) => {
          return (
              <tr key={index}>
                  <StyledTd>{name}</StyledTd>
                  <StyledTd>{date}</StyledTd>
              </tr>
          )
      })

      return (
          <EventTableDiv>
            <StyledTable>
                <thead>
                    <tr>
                      <StyledTh>name</StyledTh>
                      <StyledTh>date</StyledTh>
                    </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody> 
            </StyledTable>
          </EventTableDiv>
      )
  }
  render() {
      return (
        <div>
          {this.renderTable()}
        </div>
      )
    }
}
