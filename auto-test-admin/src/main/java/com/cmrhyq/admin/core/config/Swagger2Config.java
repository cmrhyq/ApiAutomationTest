package com.cmrhyq.admin.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

/**
 * Swagger + knife4j 使用的配置文件
 * 地址：http://ip:port/api/doc.html
 */
@Configuration
@EnableSwagger2WebMvc
@Profile({"test", "dev"})
public class Swagger2Config {
    @Bean(value = "defaultApi2")
    public Docket defaultApi2() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.cmrhyq.admin.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    //基本信息的配置，信息会在api文档上显示
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Api Automation Testn")
                .description("Api Automation Test Back-end Interface Documentation")
                .termsOfServiceUrl("https://github.com/cmrhyq")
                .version("1.0")
                .build();
    }
}

