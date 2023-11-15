---
layout: post
title: Java｜HandlerInterceptorAdapter和WebMvcConfigurer过时
categories: [Java]
description: 关于HandlerInterceptorAdapter和WebMvcConfigurerAdapter过时
keywords: 编程语言, Java
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

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

