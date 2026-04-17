import "./PageTitle.css";

function PageTitle({ id, title, subtitle }) {

    return (
        <div className="page-title-container">

            <h1 id={id} className="title">
                {title}
            </h1>

            {subtitle &&
                <p className="subtitle">
                    {subtitle}
                </p>
            }

        </div>
    )
}

export default PageTitle