import React, { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    empId: '', name: '', email: '', phone: '',
    department: '', designation: '', salary: '', doj: ''
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!form.name) err.name = 'Name is required!';
    if (!form.email) {
      err.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = 'Valid Email required!';
    }
    if (!form.phone) err.phone = 'Phone is required!';
    if (!form.department) err.department = 'Department is required!';
    if (!form.salary) {
      err.salary = 'Salary is required!';
    } else if (isNaN(form.salary)) {
      err.salary = 'Salary must be numeric!';
    }
    return err;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = () => {
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    if (editId !== null) {
      setEmployees(employees.map(emp =>
        emp.empId === editId ? { ...form } : emp
      ));
      setEditId(null);
    } else {
      const newId = 'EMP' + String(employees.length + 1).padStart(3, '0');
      setEmployees([...employees, { ...form, empId: newId }]);
    }
    setForm({ empId:'', name:'', email:'', phone:'',
      department:'', designation:'', salary:'', doj:'' });
    setErrors({});
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp.empId);
    window.scrollTo(0, 0);
  };

  const handleDelete = (empId) => {
    if (window.confirm('Delete చేయాలా?')) {
      setEmployees(employees.filter(emp => emp.empId !== empId));
    }
  };

  const filtered = employees.filter(emp =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🏢 Employee Management System</h1>

      <div className="form">
        <h2>{editId ? '✏️ Edit Employee' : '➕ Add Employee'}</h2>

        {/* Employee ID - Auto Generated */}
        <div className="field">
          <input
            name="empId"
            placeholder="Employee ID (Auto Generated)"
            value={editId ? form.empId : ''}
            disabled
            style={{ background: '#f0f0f0', color: '#666' }}
          />
        </div>

        <div className="field">
          <input name="name" placeholder="Name *"
            value={form.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <input name="email" placeholder="Email *"
            value={form.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <input name="phone" placeholder="Phone *"
            value={form.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <input name="department" placeholder="Department *"
            value={form.department} onChange={handleChange} />
          {errors.department &&
            <span className="error">{errors.department}</span>}
        </div>

        <div className="field">
          <input name="designation" placeholder="Designation"
            value={form.designation} onChange={handleChange} />
        </div>

        <div className="field">
          <input name="salary" placeholder="Salary (Numeric Only) *"
            value={form.salary} onChange={handleChange} type="number" />
          {errors.salary && <span className="error">{errors.salary}</span>}
        </div>

        <div className="field">
          <input name="doj" placeholder="Date of Joining"
            value={form.doj} onChange={handleChange} type="date" />
        </div>

        <button onClick={handleSubmit}>
          {editId ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>

      <input className="search"
        placeholder="🔍 Search by Name or Department..."
        value={search} onChange={e => setSearch(e.target.value)} />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>DOJ</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign:'center' }}>
                  No Employees Found!
                </td>
              </tr>
            ) : (
              filtered.map(emp => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>₹{emp.salary}</td>
                  <td>{emp.doj}</td>
                  <td>
                    <button className="edit-btn"
                      onClick={() => handleEdit(emp)}>✏️</button>
                    <button className="del-btn"
                      onClick={() => handleDelete(emp.empId)}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;