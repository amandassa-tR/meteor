import React, { useEffect, useState } from 'react';
import { Tracker } from 'meteor/tracker';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '../api/TasksCollection';

// Create Meteor reactive variables
const pageViewCount = new ReactiveVar(0);
const lastActivityTime = new ReactiveVar(new Date());

export const ReactiveApp = () => {
  // Meteor reactive state using Session
  const currentTab = useTracker(() => Session.get('currentTab') || 'dashboard');
  const viewCount = useTracker(() => pageViewCount.get());
  const lastActivity = useTracker(() => lastActivityTime.get());
  
  // Meteor reactive data subscription
  const isLoading = useSubscribe('tasks');
  const tasks = useTracker(() => 
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  
  const user = useTracker(() => Meteor.user());

  // Meteor reactive computation
  useEffect(() => {
    const computation = Tracker.autorun(() => {
      // This runs reactively whenever pageViewCount changes
      const count = pageViewCount.get();
      console.log('Meteor Tracker: Page view count changed to:', count);
      
      // Update last activity time reactively
      lastActivityTime.set(new Date());
    });

    // Increment page view count on mount
    pageViewCount.set(pageViewCount.get() + 1);

    return () => computation.stop();
  }, []);

  // Session-based tab switching (Meteor reactive)
  const switchTab = (tab) => {
    Session.set('currentTab', tab);
  };

  const logout = () => {
    Meteor.logout(() => {
      window.location.href = '/landing';
    });
  };

  if (isLoading()) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Loading Meteor Data...</h2>
        <p>Reactive subscriptions initializing...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Meteor Reactive Dashboard</h1>
          </div>
        </div>
      </header>
      
      <div className="main">
        {/* Meteor Reactivity Demo Section */}
        <div style={{ background: '#f0f0f0', padding: '15px', margin: '10px', borderRadius: '5px' }}>
          <h3>Meteor Reactivity Demo</h3>
          <p><strong>Page Views (ReactiveVar):</strong> {viewCount}</p>
          <p><strong>Last Activity (Tracker):</strong> {lastActivity.toLocaleTimeString()}</p>
          <p><strong>Current Tab (Session):</strong> {currentTab}</p>
          <p><strong>User (Reactive):</strong> {user?.username || 'Not logged in'}</p>
          
          <button onClick={() => pageViewCount.set(pageViewCount.get() + 1)}>
            Increment ReactiveVar
          </button>
        </div>

        {/* Tab Navigation using Session (Meteor reactive) */}
        <div style={{ margin: '20px 0' }}>
          <button 
            onClick={() => switchTab('dashboard')}
            style={{ 
              background: currentTab === 'dashboard' ? '#315481' : '#ccc',
              color: currentTab === 'dashboard' ? 'white' : 'black',
              margin: '5px', padding: '10px', border: 'none', borderRadius: '5px'
            }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => switchTab('tasks')}
            style={{ 
              background: currentTab === 'tasks' ? '#315481' : '#ccc',
              color: currentTab === 'tasks' ? 'white' : 'black',
              margin: '5px', padding: '10px', border: 'none', borderRadius: '5px'
            }}
          >
            Tasks ({tasks.length})
          </button>
          <button 
            onClick={() => switchTab('profile')}
            style={{ 
              background: currentTab === 'profile' ? '#315481' : '#ccc',
              color: currentTab === 'profile' ? 'white' : 'black',
              margin: '5px', padding: '10px', border: 'none', borderRadius: '5px'
            }}
          >
            Profile
          </button>
        </div>

        {/* Content based on reactive Session */}
        <div style={{ margin: '20px' }}>
          {currentTab === 'dashboard' && (
            <div>
              <h2>Dashboard</h2>
              <p>Welcome {user?.username}! This tab is controlled by Meteor's Session (reactive).</p>
              <p>Total tasks: <strong>{tasks.length}</strong></p>
              <p>Completed tasks: <strong>{tasks.filter(t => t.isChecked).length}</strong></p>
            </div>
          )}
          
          {currentTab === 'tasks' && (
            <div>
              <h2>Tasks</h2>
              <p>Real-time task list from Meteor publications/subscriptions:</p>
              <ul>
                {tasks.map(task => (
                  <li key={task._id} style={{ margin: '5px 0' }}>
                    {task.isChecked ? 'Completed' : 'Pending'} {task.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {currentTab === 'profile' && (
            <div>
              <h2>Profile</h2>
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>User ID:</strong> {user?._id}</p>
              <p><strong>Created:</strong> {user?.createdAt?.toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', margin: '20px' }}>
          <button onClick={logout} style={{ background: '#ff3046', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>
            Logout (Back to Server Route)
          </button>
        </div>
      </div>
    </div>
  );
}; 