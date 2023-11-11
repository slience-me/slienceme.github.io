修改成这样

```cpp
@Configuration
public class HeaderTokenInterceptor implements WebMvcConfigurer {

    @Autowired
    SecurityInterceptor securityInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration adminInterceptor = registry.addInterceptor(securityInterceptor);
        adminInterceptor.excludePathPatterns("/admin/login")
                .excludePathPatterns("/adminlogs/log")
                .excludePathPatterns("/swagger-resources/**", "/webjars/**", "/v2/**", "/swagger-ui.html/**");
        //拦截所有路径
        adminInterceptor.addPathPatterns("/admin/**");
    }

}
```
```cpp
@Configuration
public class SecurityInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
}
```

