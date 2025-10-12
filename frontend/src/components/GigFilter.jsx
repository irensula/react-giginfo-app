import { useState } from "react";

const GigFilter = ({ filters, cities = [], artists = [], gigNames = [], genres = [], months = [], updateFilter, clearFilters, handleTabClick, activeTab }) => {

    return (
        <div className="filter-container">
        <div className="filter-wrap">
            <label>
                Paikakunta<br></br>
                <select onChange={e=>updateFilter("city", e.target.value)}>
                    <option value="">Kaikki paikkakunnat</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </label>
            <label>
                Artisti<br></br>
                <select onChange={e=>updateFilter("artist", e.target.value)}>
                    <option value="">Kaikki artistit</option>
                    {artists.map((artist) => (
                        <option key={artist} value={artist}>{artist}</option>
                    ))}
                </select> 
            </label>
            <label>Keikka<br></br>
                <select onChange={e=>updateFilter("name", e.target.value)}>
                    <option value="">Kaikki keikat</option>
                    {gigNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </label>
            <label>Tyylilaji<br></br>
                <select onChange={e=>updateFilter("genre", e.target.value)}>
                        <option value="">Kaikki tyylilajit</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                </select>
            </label>
            <label>
                Kuukaudet<br></br>
                <select onChange={e=>updateFilter("month", e.target.value)}>
                    <option value="">Kaikki kuukauset</option>
                    {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
            </label>
            <button className="button" onClick={clearFilters}>Tyhjennä suodattimet</button>
        </div>
    
        {/* TABS */}
        <div className="tabs-container">
        <div className="tabs">
            <div 
                className={activeTab === "all" ? "active-tab" : "tab"}
                value="all" 
                name="filter" 
                // onClick={e=>setFilters(prev => ({...prev, filter: e.target.value}))}
                onClick={() => handleTabClick("all")}
            >
                Kaikki keikkat
            </div>
            <div
                className={activeTab === "future" ? "active-tab" : "tab"} 
                value="future" 
                name="filter" 
                // onClick={e=>setFilters(prev => ({...prev, filter: e.target.value}))}
                onClick={() => handleTabClick("future")}
            >
                Tulevat keikkat
            </div>
            <div
                className={activeTab === "past" ? "active-tab" : "tab"} 
                value="past" 
                name="filter" 
                // onClick={e=>setFilters(prev => ({...prev, filter: e.target.value}))}
                onClick={() => handleTabClick("past")}
            >
                Menneet keikkat
            </div>
            </div>
        </div>
        </div>
        )}
export default GigFilter;