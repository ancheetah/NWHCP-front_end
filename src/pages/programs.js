import React, { useState, useEffect } from 'react';
import Search from '../components/Results/Search';
import ResultCard from '../components/Results/ResultCard';
import { ResultMap } from '../components/Results/ResultMap';

const fetchPrograms = (formData, setPrograms, setLoading, setError) => {
    setLoading(true);
    // console.log("fetching...");

    fetch('https://nwhealthcareerpath.uw.edu/api/v3/search', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
        })
    })
        .then((res) => res.json())
        .then(
            (result) => {
                // console.log("fetched data: ", result);
                setPrograms(result);
            },
            (error) => {
                setLoading(false);
                setError(error);
            }
        )
        .finally(setLoading(false));
};

const Results = () => {
    const [formData, setFormData] = useState({
        searchContent: '',
        CareerEmp: [],
        HasCost: false,
        Under18: false,
        HasTransport: false,
        HasShadow: false,
        GradeLevels: []
    });
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchPrograms(formData, setPrograms, setLoading, setError);
    };

    // const handleMarkerClick = (OrgId) => {
    //     // Scroll to program card
    //     // setActiveID(OrgId);
    //     let test = document.getElementById(OrgId);
    //     test.scrollIntoView({   // need to wrap results in scrollbar for desktop
    //       behavior: 'smooth' 
    //     });
    // }

    const handleCardClick = (OrgId) => {
        // Show program on map
        // this.setState({ activeID: OrgId});
        var test = document.getElementById('mapid');
        var iconSelected = document.getElementsByClassName('marker' + OrgId);
        iconSelected[0].click();
        console.log('icon', iconSelected);
        test.scrollIntoView({
          behavior: 'smooth' 
        });
    }

    const RenderPrograms = (props) => {
        return props.programs.map((program, index) => {
            return (
                <div key={index}>
                    <ResultCard program={program} onClick={() => handleCardClick(program.OrgId)}/>
                </div>
            );
        });
    };

    useEffect(() => {
        fetchPrograms(formData, setPrograms, setLoading, setError);
    }, []);

    return (
        <div>
            <Search
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
            <ResultMap programs={programs}/>
            <div className='mt-5'>
                <h3 className='text-center text-primary mb-5'>
                    Found {programs.length} programs
                </h3>
                {loading ? (
                    <p>Loading Programs...</p>
                ) : error ? (
                    <p>Error fetching programs...</p>
                ) : (
                    <RenderPrograms programs={programs} />
                )}
            </div>
        </div>
    );
};

export default Results;
