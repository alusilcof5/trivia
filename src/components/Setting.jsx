function Setting({ label, children }) {
  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{ 
        display: 'block', 
        fontSize: '18px', 
        fontWeight: '600', 
        marginBottom: '10px' 
      }}>
        {label}
      </label>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Setting;
