import './svgIcons.scss';

interface SvgIconProps {
    name: string;
    width?: number;
    height?: number;
    fill?: string;
    stroke?: string;
    className?: string;
}

function SvgIcon({
    name,
    width,
    height,
    fill,
    stroke,
    className,
}: SvgIconProps) {
    return (
        <svg
            className={className}
            width={width}
            height={height}
            fill={fill}
            stroke={stroke}
        >
            <use href={`/svgIcons.svg#icon-${name}`} />
        </svg>
    );
}

export default SvgIcon;
