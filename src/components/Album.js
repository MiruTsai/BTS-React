import React from "react"
import QuizAnime from "./Quizanime"
import Logo from "./Logo"
import "../../css/album.css"

class Lists extends React.Component {
    createGuid = () => {
        function s4 () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
    render () {
        const { artistData, Group } = this.props
        let albums = artistData.albums.data
        albums.sort(function (a, b) {
            a = new Date(a.release_date)
            b = new Date(b.release_date)
            return b - a
        })
        let filterAlbums = albums.filter(album => {
            return album.artist.name.indexOf(Group) > -1 && album.available_territories.length > 0
        })
        const albumLists = filterAlbums.map(album => {
            return <li className="albumList" key={this.createGuid()}>
                <a href={album.url} target="_blank"><img src={album.images[0].url} /></a>
                <span className="name">{album.name}</span>
                <span className="release">{album.release_date}</span>
            </li>
        })
        return <ul className="albumLists">
            {albumLists}
        </ul>
    }
}

class Album extends React.Component {
    state = {
        animeClass: "anime",
        artistData: ""
    }
    componentDidMount = () => {
        this.getArtistDetail()
    }
    getArtistDetail = () => {
        fetch("https://api.kkbox.com/v1.1/search?q=" + this.props.Group + "&type=album&limit=50&territory=TW", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + this.props.token
            }
        }).then((result) => {
            return result.json()
        }).then((data) => {
            this.setState({
                artistData: data
            })
        })
    }
    render () {
        const { artistData } = this.state
        const { Group } = this.props
        return <>
            <Logo Group={Group} />
            {this.state.artistData === "" ? <QuizAnime animeClass={this.state.animeClass} Group={Group} /> :
                <div className="albumContainer">
                    <Lists artistData={artistData} Group={Group} />
                    <span className="source">資料來源:KKBOX</span>
                </div>}
        </>
    }
}

export default Album