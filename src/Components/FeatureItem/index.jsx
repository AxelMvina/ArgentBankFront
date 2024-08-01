export function FeatureItem({ image, title, p, alt }) {
    return (
        <div className="feature-item">
            <img src={image} alt={alt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {p}
            </p>
        </div>
    )
}