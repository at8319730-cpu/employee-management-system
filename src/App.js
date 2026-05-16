import React, { useState } from 'react';
import './App.css';

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: '', name: '', email: '', phone: '',
    department: '', designation: '', salary: '', doj: ''
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone) {
      alert('పేరు, Email, Phone తప్పనిసరి!');
      return;
    }
    if (editId !== null) {
      setEmployees(employees.map(emp =>
        emp.id === editId ? { ...form, id: editId } : emp
      ));
      setEditId(null);
    } else {
      setEmployees([...employees, { ...form, id: Date.now() }]);
    }
    setForm({ id:'',name:'',email:'',phone:'',
      department:'',designation:'',salary:'',doj:'' });
  };

  const handleEdit = (emp) => {
    setForm(emp);
    setEditId(emp.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete చేయాలా?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
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
        <input name="name" placeholder="పేరు / Name *"
          value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Email *"
          value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone *"
          value={form.phone} onChange={handleChange} />
        <input name="department" placeholder="Department"
          value={form.department} onChange={handleChange} />
        <input name="designation" placeholder="Designation"
          value={form.designation} onChange={handleChange} />
        <input name="salary" placeholder="Salary"
          value={form.salary} onChange={handleChange} type="number" />
        <input name="doj" placeholder="Date of Joining"
          value={form.doj} onChange={handleChange} type="date" />
        <button onClick={handleSubmit}>
          {editId ? 'Update చేయండి' : 'Add చేయండి'}
        </button>
      </div>

      <input className="search"
        placeholder="🔍 Search by Name or Department..."
        value={search} onChange={e => setSearch(e.target.value)} />

      <table>
        <thead>
          <tr>
            <th>పేరు</th><th>Email</th><th>Phone</th>
            <th>Department</th><th>Designation</th>
            <th>Salary</th><th>DOJ</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="8">Employee లేరు!</td></tr>
          ) : (
            filtered.map(emp => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>{emp.designation}</td>
                <td>₹{emp.salary}</td>
                <td>{emp.doj}</td>
                <td>
                  <button onClick={() => handleEdit(emp)}>✏️</button>
                  <button onClick={() => handleDelete(emp.id)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
