import connectDB from '../api/lib/db';
import Feedback from '../api/models/feedback';
import { useState, Fragment } from 'react';
function FeedBackPage(props) {
    const [item, setItem] = useState();
    const hanldeLoadDetail = (id) => {
        fetch('/api/' + id)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setItem(data.feedback)


            });
    }


    return (<Fragment>

        {item && <p> {item[0].content} </p>}
        <ul>

            {
                props.feedbacks.map(item => (<li key={item._id}>
                    <p> <strong> Email:  </strong>{item.email}</p>
                    <button onClick={hanldeLoadDetail.bind(null, item.id)}> Show Details </button> </li>))

            }
        </ul>
    </Fragment>
    );

};

export async function getStaticProps(context) {
    await connectDB();
    const feedbacks = await (Feedback.find().lean());

    console.log(feedbacks);
    return {
        props: {
            feedbacks: JSON.parse(JSON.stringify(feedbacks)), // Convert Mongoose documents to JSON
        },
        revalidate: 10, // Re-generate the page every 10 seconds (ISR)
    };


}

export default FeedBackPage;