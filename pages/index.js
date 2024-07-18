import { useRef } from "react";
function HomdePage(props) {
    const inputEmailRef = useRef();
    const inputFeedbackRef = useRef();

    const hanldeSubmit = async (evt) => {
        evt.preventDefault();
        const enteredEmail = inputEmailRef.current.value;
        const enteredFeedback = inputFeedbackRef.current.value;
        console.log('fucntion')
        const reqBody = {
            email: enteredEmail,
            text: enteredFeedback
        }
        const res = await fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (!res.ok) {
            const errordesc = await res.text();
            console.log(errordesc)
        }
        else {
            const data = await res.json();
            console.log(data)

        }


    }

    return (

        <div>
            <h1> </h1>
            <form onSubmit={hanldeSubmit}>
                <div>
                    <label htmlFor="email">Enter your Email</label>
                    <input type="email" id="email" ref={inputEmailRef} />
                </div>
                <div>
                    <label htmlFor="feedback">Your feedbck</label>
                    <textarea id="feedback" rows="5" ref={inputFeedbackRef}>  </textarea>
                </div>
                <div>
                    <button onClick={hanldeSubmit}> Send Back</button>
                </div>
            </form>
        </div>
    );


}

export default HomdePage;