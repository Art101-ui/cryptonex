// components/ProgressBar.js

type ProgressBarProps ={
    percentage: number,
    color:string
}

const ProgressBar = ({ percentage,color  }: ProgressBarProps) => {
    return (
        <div
            style={{ width: `${percentage}%`}}
            className={`h-full  ${color}`}>
        </div>
    );
};

export default ProgressBar;
