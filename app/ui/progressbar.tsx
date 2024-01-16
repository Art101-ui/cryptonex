// components/ProgressBar.js

type ProgressBarProps ={
    percentage: number,
    color:string
}

const ProgressBar = ({ percentage,color  }: ProgressBarProps) => {
    return (
        <div
            style={{ width: `${percentage}%`}}
            className={`h-full rounded-sm ${color}`}>
        </div>
    );
};

export default ProgressBar;
