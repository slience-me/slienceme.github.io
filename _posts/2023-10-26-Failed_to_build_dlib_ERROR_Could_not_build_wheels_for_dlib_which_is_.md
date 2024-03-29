---
layout: post
title: 教程｜Failed_to_build_dlib_ERROR_Could...
categories: [教程]
description: 【已解决】Failed to build dlib ERROR_ Could not build wheels for dlib, which is required to install pypro
keywords: 教程, 数据库
mermaid: false
sequence: false
flow: false
mathjax: false
mindmap: false
mindmap2: false
---

## 报错来源
在安装dlib包的时候，报错以下内容
- Failed to build dlib， ERROR: Could not build wheels for dlib, which is required to install pyproject.toml-based projects

```python
(torch) PS D:\current_project\1111\222\333\444\555\666> pip3 install dlib
Looking in indexes: https://pypi.tuna.tsinghua.edu.cn/simple/
Collecting dlib
  Downloading https://pypi.tuna.tsinghua.edu.cn/packages/2e/9d/4e1003c044bdb07f7c0d83ae87d694e10e5a6c296b84566aa9a6ec9eed2a/dlib-19.24.2.tar.gz (11.8 MB)
     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 11.8/11.8 MB 15.6 MB/s eta 0:00:00
  Installing build dependencies ... done
  Getting requirements to build wheel ... done
  Preparing metadata (pyproject.toml) ... done
Building wheels for collected packages: dlib
  Building wheel for dlib (pyproject.toml) ... error
  error: subprocess-exited-with-error
  
  × Building wheel for dlib (pyproject.toml) did not run successfully.
  │ exit code: 1
  ╰─> [73 lines of output]
      running bdist_wheel
      running build
      running build_ext
      <string>:125: DeprecationWarning: distutils Version classes are deprecated. Use packaging.version instead.
      Building extension for Python 3.10.12 | packaged by Anaconda, Inc. | (main, Jul  5 2023, 19:09:20) [MSC v.1916 64 bit (AMD64)]
      Invoking CMake setup: 'cmake C:\Users\slien\AppData\Local\Temp\pip-install-qt0f1j6n\dlib_d0206d14b50a478aaef9a320c5ccbd47\tools\python -DCMAKE_LIBRARY_OUTPUT_DIRECTORY=C:\Users\slien\AppData\Local\Temp\pip-install-qt0f1j6n\dlib_d0206d14b50a478a
aef9a320c5ccbd47\build\lib.win-amd64-cpython-310 -DPYTHON_EXECUTABLE=C:\ProgramData\anaconda3\envs\torch\python.exe -DCMAKE_LIBRARY_OUTPUT_DIRECTORY_RELEASE=C:\Users\slien\AppData\Local\Temp\pip-install-qt0f1j6n\dlib_d0206d14b50a478aaef9a320c5ccbd47\build\lib.win-amd64-cpython-310 -A x64'
      -- Building for: NMake Makefiles
      CMake Error at CMakeLists.txt:5 (message):



        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        You must use Visual Studio to build a python extension on windows.  If you
        are getting this error it means you have not installed Visual C++.  Note
        that there are many flavors of Visual Studio, like Visual Studio for C#
        development.  You need to install Visual Studio for C++.


        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




      -- Configuring incomplete, errors occurred!
      Traceback (most recent call last):
        File "C:\ProgramData\anaconda3\envs\torch\lib\site-packages\pip\_vendor\pyproject_hooks\_in_process\_in_process.py", line 353, in <module>
          main()
        File "C:\ProgramData\anaconda3\envs\torch\lib\site-packages\pip\_vendor\pyproject_hooks\_in_process\_in_process.py", line 335, in main
          json_out['return_val'] = hook(**hook_input['kwargs'])
        File "C:\ProgramData\anaconda3\envs\torch\lib\site-packages\pip\_vendor\pyproject_hooks\_in_process\_in_process.py", line 251, in build_wheel
          return _build_backend().build_wheel(wheel_directory, config_settings,
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\build_meta.py", line 434, in build_wheel
          return self._build_with_temp_dir(
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\build_meta.py", line 419, in _build_with_temp_dir
          self.run_setup()
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\build_meta.py", line 341, in run_setup
          exec(code, locals())
        File "<string>", line 218, in <module>
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\__init__.py", line 103, in setup
          return distutils.core.setup(**attrs)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\core.py", line 185, in setup
          return run_commands(dist)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\core.py", line 201, in run_commands
          dist.run_commands()
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\dist.py", line 969, in run_commands
          self.run_command(cmd)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\dist.py", line 989, in run_command
          super().run_command(command)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\dist.py", line 988, in run_command
          cmd_obj.run()
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\wheel\bdist_wheel.py", line 364, in run
          self.run_command("build")
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\cmd.py", line 318, in run_command
          self.distribution.run_command(command)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\dist.py", line 989, in run_command
          super().run_command(command)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\dist.py", line 988, in run_command
          cmd_obj.run()
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\command\build.py", line 131, in run
          self.run_command(cmd_name)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\cmd.py", line 318, in run_command
          self.distribution.run_command(command)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\dist.py", line 989, in run_command
          super().run_command(command)
        File "C:\Users\slien_me\AppData\Local\Temp\pip-build-env-izrmy2e6\overlay\Lib\site-packages\setuptools\_distutils\dist.py", line 988, in run_command
          cmd_obj.run()
        File "<string>", line 130, in run
        File "<string>", line 167, in build_extension
        File "C:\ProgramData\anaconda3\envs\torch\lib\subprocess.py", line 369, in check_call
          raise CalledProcessError(retcode, cmd)
      subprocess.CalledProcessError: Command '['cmake', 'C:\\Users\\slien_me\\AppData\\Local\\Temp\\pip-install-qt0f1j6n\\dlib_d0206d14b50a478aaef9a320c5ccbd47\\tools\\python', '-DCMAKE_LIBRARY_OUTPUT_DIRECTORY=C:\\Users\\slien_me\\AppData\\Local\\Temp\\pi
p-install-qt0f1j6n\\dlib_d0206d14b50a478aaef9a320c5ccbd47\\build\\lib.win-amd64-cpython-310', '-DPYTHON_EXECUTABLE=C:\\ProgramData\\anaconda3\\envs\\torch\\python.exe', '-DCMAKE_LIBRARY_OUTPUT_DIRECTORY_RELEASE=C:\\Users\\slien_me\\AppData\\Local\\Temp\\pip-install-qt0f1j6n\\dlib_d0206d14b50a478aaef9a320c5ccbd47\\build\\lib.win-amd64-cpython-310', '-A', 'x64']' returned non-zero exit status 1.
      [end of output]

  note: This error originates from a subprocess, and is likely not a problem with pip.
  ERROR: Failed building wheel for dlib
Failed to build dlib
ERROR: Could not build wheels for dlib, which is required to install pyproject.toml-based projects
```

## 解决方案
因为我的环境是anaconda的虚拟环境所以执行以下的语句

```python
conda install -c conda-forge dlib
```
然后，他就成功安装了，注意中间会出现一个选择，输入y回车即可

```python
(torch) PS D:\current_project\111\222\333\444\555\666> conda install -c conda-forge dlib
Collecting package metadata (current_repodata.json): \ DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): conda.anaconda.org:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): conda.anaconda.org:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
/ DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/main/win-64/current_repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/r/win-64/current_repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/r/noarch/current_repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/msys2/win-64/current_repodata.json HTTP/1.1" 304 0
- DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/main/noarch/current_repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/msys2/noarch/current_repodata.json HTTP/1.1" 304 0
\ DEBUG:urllib3.connectionpool:https://conda.anaconda.org:443 "GET /conda-forge/noarch/current_repodata.json HTTP/1.1" 200 None
DEBUG:urllib3.connectionpool:https://conda.anaconda.org:443 "GET /conda-forge/win-64/current_repodata.json HTTP/1.1" 200 None
done
Solving environment: - 
The environment is inconsistent, please check the package plan carefully
The following packages are causing the inconsistency:

  - conda-forge/win-64::protobuf==3.20.3=py310h5588dad_1
  - conda-forge/noarch::tensorboard==2.15.0=pyhd8ed1ab_0
  - defaults/noarch::tensorboardx==2.2=pyhd3eb1b0_0
unsuccessful initial attempt using frozen solve. Retrying with flexible solve.
Solving environment: unsuccessful attempt using repodata from current_repodata.json, retrying with next repodata source.
Collecting package metadata (repodata.json): - DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): conda.anaconda.org:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): conda.anaconda.org:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): repo.anaconda.com:443
- DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/r/win-64/repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/r/noarch/repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/main/noarch/repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/main/win-64/repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/msys2/noarch/repodata.json HTTP/1.1" 304 0
DEBUG:urllib3.connectionpool:https://repo.anaconda.com:443 "GET /pkgs/msys2/win-64/repodata.json HTTP/1.1" 304 0
| DEBUG:urllib3.connectionpool:https://conda.anaconda.org:443 "GET /conda-forge/noarch/repodata.json HTTP/1.1" 200 None
DEBUG:urllib3.connectionpool:https://conda.anaconda.org:443 "GET /conda-forge/win-64/repodata.json HTTP/1.1" 200 None
done
Solving environment: - 
The environment is inconsistent, please check the package plan carefully
The following packages are causing the inconsistency:

  - conda-forge/win-64::protobuf==3.20.3=py310h5588dad_1
  - conda-forge/noarch::tensorboard==2.15.0=pyhd8ed1ab_0
  - defaults/noarch::tensorboardx==2.2=pyhd3eb1b0_0
done


==> WARNING: A newer version of conda exists. <==
  current version: 23.7.2
  latest version: 23.9.0

Please update conda by running

    $ conda update -n base -c defaults conda

Or to minimize the number of packages updated during conda update use

     conda install conda=23.9.0



## Package Plan ##

  environment location: C:\ProgramData\anaconda3\envs\torch

  added / updated specs:
    - dlib


The following packages will be downloaded:

    package                    |            build
    ---------------------------|-----------------
    dlib-19.24.0               |  py310he5227f5_0         4.3 MB  conda-forge
    setuptools-68.2.2          |     pyhd8ed1ab_0         454 KB  conda-forge
    ------------------------------------------------------------
                                           Total:         4.8 MB

The following NEW packages will be INSTALLED:

  dlib               conda-forge/win-64::dlib-19.24.0-py310he5227f5_0
  setuptools         conda-forge/noarch::setuptools-68.2.2-pyhd8ed1ab_0

The following packages will be SUPERSEDED by a higher-priority channel:

  ca-certificates    pkgs/main::ca-certificates-2023.08.22~ --> conda-forge::ca-certificates-2023.7.22-h56e8100_0
  certifi            pkgs/main/win-64::certifi-2023.7.22-p~ --> conda-forge/noarch::certifi-2023.7.22-pyhd8ed1ab_0

done

```

