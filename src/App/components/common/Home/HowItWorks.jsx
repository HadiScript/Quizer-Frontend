
import '../../../../assets/css/Items.css'

const topics = [
  { number: "1", title: "Create Quiz" },
  { direction: "bottom-left", number: "2", title: "Add Questions", },
  { number: "3", title: "Set The Attempt Limits", author: "" },
  { direction: "bottom-left", number: "4", title: "Adjust The Settings", author: "Global or Quiz Settings" },
  { number: "5", title: "Copy Quiz Link", author: "Now you can provide that link to your students" },
  { direction: "bottom-right", number: "6", title: "Check the Response", },
  { number: "7", title: "Analyze Your Quiz", }
];

const HowItWorks = () => {
  return (
    <div style={{ marginTop: "100px", marginBottom: "100px" }}>
      <div className='feature8-title-wrapper'>
        <h1 style={{ fontWeight: "600" }}>How it works?</h1>
        <p>  Ant Design 5.0 enable extendable algorithm, make custom theme easier</p>
      </div>
      <main key={"HowItWorks"} id='How it works?' className='item-container'>




        {topics.map((val, index) => {
          let className = 'item item--top';
          if (val.direction === 'bottom-left') {
            className = 'item item--bottom item--left';
          } else if (val.direction === 'bottom-right') {
            className = 'item item--bottom';
          }

          return (
            <div key={index} className={className} >
              <div className="item__number">{val.number}</div>
              <div className="item__topic">
                <div className="item__topic__title" dangerouslySetInnerHTML={{ __html: val.title }} />
                <div className="item__topic__author">

                  <span>{val.author}</span>
                </div>
              </div>
            </div>
          );
        })}
      </main>

    </div>
  );
};

export default HowItWorks;
