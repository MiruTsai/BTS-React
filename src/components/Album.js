import React, { Component } from "react"
import QuizAnime from "./Quizanime"
import Logo from "./Logo"
import "../../css/album.css"

class Lists extends Component {
    createGuid = () => {
        function s4 () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
    render () {
        const { artistData, minData, maxData } = this.props
        let albums = artistData.slice(minData, maxData)
        return <ul className="albumLists">
            {albums.map(album => {
                return (
                    <li className="albumList" key={this.createGuid()}>
                        <a href={album.url} target="_blank"><img src={album.images[0].url} /></a>
                        <span className="name">{album.name}</span>
                        <span className="release">{album.release_date}</span>
                    </li>
                )
            })}
        </ul>
    }
}
class PageBtn extends Component {
    render () {
        const { index, toPage } = this.props
        return <button onClick={() => { toPage(index) }}>{index}</button>
    }
}
class Page extends React.Component {
    render () {
        const { pageTotal, toPage } = this.props
        return <div className="btnBox">
            {Array(pageTotal).fill().map((_, index) => {
                return <PageBtn index={index + 1} key={Math.floor(Math.random() * 1000)} toPage={toPage} />
            })}
        </div>
    }
}
class Album extends Component {
    state = {
        animeClass: "anime",
        artistData: "",
        currentPage: 1,
        perpage: 10,
        pageTotal: ""
    }
    componentDidMount = () => {
        this.getArtistDetail()
    }
    getArtistDetail = () => {
        const { Group } = this.props
        fetch("https://api.kkbox.com/v1.1/search?q=" + Group + "&type=album&limit=50&territory=TW", {
            method: "GET",
            headers: {
                "authorization": "Bearer " + this.props.token
            }
        }).then((result) => {
            return result.json()
        }).then((data) => {
            let albums = data.albums.data
            albums.sort(function (a, b) {
                a = new Date(a.release_date)
                b = new Date(b.release_date)
                return b - a
            })
            let filterAlbums = albums.filter(album => {
                return album.artist.name.indexOf(Group) > -1 && album.available_territories.length > 0
            })
            this.setState({
                artistData: filterAlbums,
                pageTotal: Math.ceil(filterAlbums.length / this.state.perpage)
            })
            this.toPage(1)
        })
    }
    switch = () => {
        if (this.props.userUid === "") {
            this.props.history.push("/login")
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        } else {
            this.setState({
                alertMessage: "",
                alertBlock: !this.state.alertBlock
            })
        }
    }
    toPage = (currentPage) => {
        const { perpage } = this.state
        const maxData = currentPage * perpage
        const minData = (currentPage * perpage) - perpage
        this.setState({
            currentPage: currentPage,
            minData: minData,
            maxData: maxData
        })
    }
    render () {
        const { artistData, pageTotal, minData, maxData } = this.state
        const { Group } = this.props
        return <>
            <Logo Group={Group} />
            {this.state.artistData === "" ? <QuizAnime animeClass={this.state.animeClass} Group={Group} /> :
                <div className="albumContainer">
                    <div className="box">
                        <Lists artistData={artistData} Group={Group} minData={minData} maxData={maxData} />
                    </div>
                    <Page pageTotal={pageTotal} toPage={this.toPage} />
                    <span className="source">資料來源:KKBOX<br />*此發行時間為台灣發行時間</span>
                </div>}
        </>
    }
}

export default Album