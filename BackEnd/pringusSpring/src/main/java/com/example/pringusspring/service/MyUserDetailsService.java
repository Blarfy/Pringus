package com.example.pringusspring.service;

import com.example.pringusspring.model.User;
import com.example.pringusspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findOneByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (user == null) {
            throw new UsernameNotFoundException(username + " not found");
        }
        return new MyUserDetails(user);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public int countUsers() {
        return (int) userRepository.count();
    }

    public String getRole(String username) {
        return userRepository.findOneByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found")).getRole();
    }


}
