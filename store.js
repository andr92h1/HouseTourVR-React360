import React from "react"
import { asset } from "react-360";
import { Environment } from "react-360";
import house from "./data/houseData"

const state = {

room: house.House.roomName,
info: house.House.info,
adjacentRooms: house.House.adjacentRooms
}


const listeners = new Set();

function updateComponents(){
    for (const cb of listeners.values()){
        cb();
    }
}


export function changeRoom(roomSelection){
let roomName = roomSelection;

state.room = roomName;
state.info = house[`${roomName}`].info;
state.adjacentRooms = house[`${roomName}`].adjacentRooms;

Environment.setBackgroundImage(asset(`./360_${house[`${roomName}`].img}`));


updateComponents();

}

export function connect(Component) {
return class Wrapper extends React.Component {
    state = {
room: state.room,
info: state.info,
adjacentRooms: state.adjacentRooms
    }

    _listener = () => {
        this.setState({
            room: state.room,
            info: state.info,
            adjacentRooms: state.adjacentRooms
        })
    }

    componentDidMount() {
        listeners.add(this._listener);
    }

    render () {
        return (
            <Component
    {...this.props}
    room={this.state.room}
    info={this.state.info}
    adjacentRooms={this.state.adjacentRooms} 
    
    />
        )
    }
}

}