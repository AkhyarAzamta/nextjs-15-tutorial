interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div 
        className="spinner"
        style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007acc',
          borderRadius: '50%',
          margin: '0 auto 1rem'
        }} 
      />
      <p>{text}</p>
    </div>
  );
}
